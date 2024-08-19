## Starting to create a youtube clone from scratch

# Why I've used JSON.parse(JSON.stringify(<Object>)) in some page.tsx_s ? :-

    because the _id generated by MongoDB is of an Object type which can't be directly passed to the client components. This is because NextJS first generates non-client pages on the server and there, mongoose generates ObjectIds of docs which may not be transferable via http(s) directly to the client as any normal string (I don't fully know how the http(s) handles request data inputs like mongoose-ObjectId but I've come to know that those _ids need to be parsed to string (then object again if we need JSON data))
