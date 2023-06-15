RESPONSE=$(curl -X POST -H "Authorization: Token r8_VUUWnnVCAqVHMyu0ySIAQtxBEV19Ysm0jixdj" https://dreambooth-api-experimental.replicate.com/v1/upload/data.zip)
curl -X PUT -H "Content-Type: application/zip" --upload-file /mnt/c/Users/alexa/Documents/Data/LandscapeSet.zip "$(jq -r ".upload_url" <<< "$RESPONSE")"
SERVING_URL=$(jq -r ".serving_url" <<< $RESPONSE)
echo $SERVING_URL