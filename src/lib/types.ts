// (almost) all the major types used at the client-side

import { UploadApiResponse } from "cloudinary";

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
		duration: number;
	};
	views: number;
	createdAt: string | Date;
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

export interface CCreator {
	avatar: { public_id: string };
	subscribers: number;
	username: string;
	_id: string;
	email: string;
}

export interface CUser {
	_id: string;
	email: string;
	username: string;
	avatar: { secure_url: string; public_id: string };
}

export interface CVideoUploadApiResponse extends UploadApiResponse {
	duration: number;
}
