import json

file_path = r'c:\Users\Taiji\Desktop\Ai-projects\ang-homepage\src\data\cms.json'
try:
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("JSON has been reformatted and saved.")
except Exception as e:
    print(f"Error: {e}")
