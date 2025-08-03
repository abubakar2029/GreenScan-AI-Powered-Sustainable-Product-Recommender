import os

script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

EXCLUDE_FILES = {
    'rename_eco_images.py',  # the script itself
    'file_upload_cmds.md',       # documentation
    'meta_file_generate.py',     # other scripts
    'README.md',                 # project info
    '.gitignore'                 # git config
}

files = [f for f in os.listdir() 
         if os.path.isfile(f) 
         and f not in EXCLUDE_FILES]

for i, f in enumerate(files):
    name, ext = os.path.splitext(f)
    os.rename(f, f"eco_{i}{ext}")