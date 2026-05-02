import sys
import os

path = r'C:\Users\Taiji\Desktop\Ai-projects\ang-homepage\src\contexts\PriceContext.tsx'
if not os.path.exists(path):
    print(f"File {path} not found")
    sys.exit(1)

with open(path, 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

# Line 401 is index 400
if len(lines) > 400:
    print(f"Replacing line 401: {lines[400].strip()}")
    lines[400] = '            { title: "ツィーター取付", description: "純正位置もしくはダッシュボードへ置き型マウント装着", icon: "Speaker" },\n'
else:
    print(f"File too short: {len(lines)} lines")
    sys.exit(1)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print("Successfully fixed PriceContext.tsx")
