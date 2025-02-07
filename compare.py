import os

def calculate_dist_folder_sizes(repo_path):
    dist_folder_sizes = {}
    for root, dirs, files in os.walk(repo_path):
        if 'node_modules' in root.split(os.path.sep):
            continue
        if root.endswith('/dist'):
            folder_size = 0
            for file in files:
                file_path = os.path.join(root, file)
                folder_size += os.path.getsize(file_path)
            dist_folder_sizes[root] = folder_size
    return dist_folder_sizes

# Example usage
repo_path = '.'  # Replace with the actual path to your turbo repo
sizes = calculate_dist_folder_sizes(repo_path)

# Print the results
for file_path, size in sizes.items():
    print(f"{file_path}: {size} bytes")
