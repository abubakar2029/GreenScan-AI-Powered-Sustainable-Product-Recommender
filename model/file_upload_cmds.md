## Upload all files
huggingface-cli upload muhammadabubakarcs26/eco-image-classifier ./eco --repo-type dataset

huggingface-cli upload muhammadabubakarcs26/eco-image-classifier ./non_eco --repo-type dataset


Hugging Face Login Token: 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
    
## verify uploads


### initialize Git LFS
git lfs install

### Track image file types
git lfs track "*.jpg"
git lfs track "*.jpeg"
git lfs track "*.png"
