export interface CVideoCard {
	_id: string;
	title: string;
	creator: {
		username: string;
		_id: string;
		avatar: {
			secure_url: string;
			public_id: string;
		};
		email: string;
	};
	thumbnail: {
		secure_url: string;
		public_id: string;
	};
	video: {
		secure_url: string;
		public_id: string;
	};
	views: number;
	createdAt: Date;
}
export interface CVideoPlayable extends CVideoCard {
	creator: {
		username: string;
		_id: string;
		avatar: {
			secure_url: string;
			public_id: string;
		};
		email: string;
		subscribers: number;
	};
	likes: number;
	dislikes: number;
	description: string;
}
export interface CComment {
	_id: string;
	commenter: {
		username: string;
		avatar: {
			secure_url: string;
			public_id: string;
		};
		email: string;
	};
	body: string;
	createdAt: Date;
	likes: number;
	dislikes: number;
}
