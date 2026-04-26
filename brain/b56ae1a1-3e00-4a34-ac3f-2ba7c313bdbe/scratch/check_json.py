import json

file_path = r'c:\Users\Taiji\Desktop\Ai-projects\ang-homepage\src\data\cms.json'
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        json.load(f)
    print("JSON is valid.")
except json.JSONDecodeError as e:
    print(f"Error: {e}")
    print(f"Position: {e.pos}")
    print(f"Line: {e.lineno}")
    print(f"Column: {e.colno}")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        start = max(0, e.pos - 50)
        end = min(len(content), e.pos + 50)
        print(f"Context: ...{content[start:end]}...")
