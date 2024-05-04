
## Running 
### Developement 
- `npm install`
- `npm run dev`

### With docker 
- `docker buildx build -t demo .`
- `docker run -p 3000:3000 demo`


## Endpoint for testing
- `POST` http://localhost:3000/quest/claim


## Notes
- Expected output example has status `success` and score `3`
- That state is invalid as score needs to be >= 5 to be success