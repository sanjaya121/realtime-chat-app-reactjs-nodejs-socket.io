import mongoose from 'mongoose';

const messageSchema = new mongoose({
	senderID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	receiverID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	text: {
		type: String,
	},

	image: {
		type: String,
	},
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
