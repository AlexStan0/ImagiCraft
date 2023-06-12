RESPONSE=$(curl -X POST -H "Authorization: Token $REPLICATE_API_TOKEN" https://dreambooth-api-experimental.replicate.com/v1/upload/data.zip)
curl -X PUT -H "Content-Type: application/zip" --upload-file /home/alexa/Downloads/archive.zip "$(jq -r ".upload_url" <<< "$RESPONSE")"
SERVING_URL=$(jq -r ".serving_url" <<< $RESPONSE)
" <<< $RESPONSE)
