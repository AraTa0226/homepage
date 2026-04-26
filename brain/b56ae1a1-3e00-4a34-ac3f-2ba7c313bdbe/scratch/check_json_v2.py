import json
import sys

file_path = r'c:\Users\Taiji\Desktop\Ai-projects\ang-homepage\src\data\cms.json'
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    print("JSON is perfectly valid.")
except json.JSONDecodeError as e:
    print(f"Error: {e.msg}")
    print(f"Line: {e.lineno}, Column: {e.colno}, Position: {e.pos}")
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        if 1 <= e.lineno <= len(lines):
            print(f"Line {e.lineno}: {lines[e.lineno-1].strip()}")
            if e.lineno > 1:
                print(f"Line {e.lineno-1}: {lines[e.lineno-2].strip()}")
            if e.lineno < len(lines):
                print(f"Line {e.lineno+1}: {lines[e.lineno].strip()}")
