
```
import mongoose from 'mongoose'

let models = {}

console.log('Connecting to mongodb')

// TODO: Insert mongodb connection URL below
await mongoose.connect('mongodb://localhost:27017/userDemo)

console.log('Connected to mongodb')

const userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	favorite_ice_cream: String
})

models.User = mongoose.model('User', userSchema)

export default models
```


> remember to edit IP access list
> ![[ipaccesslist.png]]