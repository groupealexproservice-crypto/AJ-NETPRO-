"""Builds public/models/sculpture-aurex.glb: a pyramid (structure, elevation) circled by a gold orbit, on a black plinth.
No external 3D tool needed: writes glTF 2.0 binary with numpy.   python3 scripts/build-sculpture.py"""
import json, struct, math
import numpy as np

meshes = []          # (name, positions, normals, indices, material index)

def add(name, pos, nor, idx, mat): meshes.append((name, np.asarray(pos, "<f4"), np.asarray(nor, "<f4"), np.asarray(idx, "<u2"), mat))

def rot(vs, ax, deg):
    a = math.radians(deg); c, s = math.cos(a), math.sin(a)
    m = {"x": [[1,0,0],[0,c,-s],[0,s,c]], "y": [[c,0,s],[0,1,0],[-s,0,c]], "z": [[c,-s,0],[s,c,0],[0,0,1]]}[ax]
    return vs @ np.array(m).T

def torus(R, r, seg=128, tube=20):
    P, N = [], []
    for i in range(seg + 1):
        u = 2 * math.pi * i / seg
        cx, cz = math.cos(u), math.sin(u)
        for j in range(tube + 1):
            v = 2 * math.pi * j / tube
            nx, ny, nz = math.cos(v) * cx, math.sin(v), math.cos(v) * cz
            P.append([(R + r * math.cos(v)) * cx, r * math.sin(v), (R + r * math.cos(v)) * cz]); N.append([nx, ny, nz])
    I = []
    for i in range(seg):
        for j in range(tube):
            a = i * (tube + 1) + j; b = a + tube + 1
            I += [a, b, a + 1, b, b + 1, a + 1]
    return np.array(P), np.array(N), I

def cylinder(R, h, seg=96):
    P, N, I = [], [], []
    for i in range(seg + 1):
        u = 2 * math.pi * i / seg; x, z = math.cos(u), math.sin(u)
        P += [[R * x, 0, R * z], [R * x, h, R * z]]; N += [[x, 0, z], [x, 0, z]]
    for i in range(seg):
        a = 2 * i; I += [a, a + 1, a + 2, a + 1, a + 3, a + 2]
    base = len(P); P.append([0, h, 0]); N.append([0, 1, 0])
    for i in range(seg + 1):
        u = 2 * math.pi * i / seg; P.append([R * math.cos(u), h, R * math.sin(u)]); N.append([0, 1, 0])
    for i in range(seg): I += [base, base + 2 + i, base + 1 + i]
    return np.array(P), np.array(N), I

# Plinth (black), top at y = 0.14
P, N, I = cylinder(2.05, 0.14); add("plinth", P, N, I, 0)
P, N, I = torus(1.98, 0.014, 160, 12); P[:, 1] += 0.14; add("plinth-line", P, N, I, 2)

# Pyramid: 4 flat faces, alternating lit (silver) and shadow (graphite), base on the plinth
h, s, y0 = 1.9, 1.05, 0.14
apex = np.array([0, y0 + h, 0]); c = [np.array(p) for p in [[-s, y0, -s], [s, y0, -s], [s, y0, s], [-s, y0, s]]]
lit, shade = ([], [], []), ([], [], [])
for k in range(4):
    a, b = c[k], c[(k + 1) % 4]
    n = np.cross(b - a, apex - a); n /= np.linalg.norm(n)
    tgt = lit if k % 2 == 0 else shade
    base = len(tgt[0])
    tgt[0].extend([a, b, apex]); tgt[1].extend([n, n, n]); tgt[2].extend([base, base + 1, base + 2])
add("pyramid-lit", *[np.array(x) if i < 2 else x for i, x in enumerate(lit)], 3)
add("pyramid-shade", *[np.array(x) if i < 2 else x for i, x in enumerate(shade)], 4)

# Gold orbit: a tilted ring around the pyramid, like the logo
P, N, I = torus(1.62, 0.045, 160, 20)
P = rot(rot(P, "z", 12), "x", -10) + np.array([0, 1.05, 0]); N = rot(rot(N, "z", 12), "x", -10)
add("orbit", P, N, I, 1)

materials = [
    {"name": "Noir", "pbrMetallicRoughness": {"baseColorFactor": [0.012, 0.012, 0.015, 1], "metallicFactor": 0.0, "roughnessFactor": 1.0}},
    {"name": "Or AUREX", "pbrMetallicRoughness": {"baseColorFactor": [0.86, 0.55, 0.12, 1], "metallicFactor": 1, "roughnessFactor": 0.22}, "emissiveFactor": [0.32, 0.18, 0.02]},
    {"name": "Or fin", "pbrMetallicRoughness": {"baseColorFactor": [0.86, 0.55, 0.12, 1], "metallicFactor": 1, "roughnessFactor": 0.3}, "emissiveFactor": [0.2, 0.11, 0.01]},
    {"name": "Argent", "pbrMetallicRoughness": {"baseColorFactor": [0.66, 0.68, 0.72, 1], "metallicFactor": 1, "roughnessFactor": 0.4}, "doubleSided": True},
    {"name": "Graphite", "pbrMetallicRoughness": {"baseColorFactor": [0.2, 0.21, 0.24, 1], "metallicFactor": 1, "roughnessFactor": 0.35}, "doubleSided": True},
]

blob = bytearray(); views, accs, prims = [], [], []
def push(arr, target):
    while len(blob) % 4: blob.append(0)
    views.append({"buffer": 0, "byteOffset": len(blob), "byteLength": arr.nbytes, "target": target}); blob.extend(arr.tobytes()); return len(views) - 1
for name, P, N, I, mat in meshes:
    P = np.asarray(P, "<f4"); N = np.asarray(N, "<f4"); I = np.asarray(I, "<u2")
    vp, vn, vi = push(P, 34962), push(N, 34962), push(I, 34963)
    accs.append({"bufferView": vp, "componentType": 5126, "count": len(P), "type": "VEC3", "min": P.min(0).tolist(), "max": P.max(0).tolist()})
    accs.append({"bufferView": vn, "componentType": 5126, "count": len(N), "type": "VEC3"})
    accs.append({"bufferView": vi, "componentType": 5123, "count": len(I), "type": "SCALAR"})
    prims.append({"attributes": {"POSITION": len(accs) - 3, "NORMAL": len(accs) - 2}, "indices": len(accs) - 1, "material": mat})

gltf = {"asset": {"version": "2.0", "generator": "AUREX build-sculpture.py"}, "scene": 0, "scenes": [{"nodes": [0]}], "nodes": [{"name": "Sculpture AUREX", "mesh": 0}],
        "meshes": [{"name": "Sculpture AUREX", "primitives": prims}], "materials": materials, "accessors": accs, "bufferViews": views, "buffers": [{"byteLength": len(blob)}]}
js = json.dumps(gltf, separators=(",", ":")).encode(); js += b" " * (-len(js) % 4)
while len(blob) % 4: blob.append(0)
out = struct.pack("<III", 0x46546C67, 2, 12 + 8 + len(js) + 8 + len(blob)) + struct.pack("<II", len(js), 0x4E4F534A) + js + struct.pack("<II", len(blob), 0x004E4942) + bytes(blob)
open("public/models/sculpture-aurex.glb", "wb").write(out); print("written", len(out) // 1024, "KB")
