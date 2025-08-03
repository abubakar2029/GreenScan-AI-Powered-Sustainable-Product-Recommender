import csv
import os

with open('metadata.csv', 'w') as f:
    writer = csv.writer(f)
    writer.writerow(['file_name', 'label'])
    for img in os.listdir('eco'):
        writer.writerow([img, 'eco'])
    for img in os.listdir('non_eco'):
        writer.writerow([img, 'non_eco'])