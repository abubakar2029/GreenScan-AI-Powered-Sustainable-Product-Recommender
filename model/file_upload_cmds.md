## Upload all files
huggingface-cli upload muhammadabubakarcs26/eco-image-classifier \
    --repo-type dataset \
    ./eco eco/ \
    ./non_eco non_eco/ \
    ./metadata.csv metadata.csv

    
## verify uploads
https://huggingface.co/datasets/muhammadabubakarcs26/eco-image-classifier