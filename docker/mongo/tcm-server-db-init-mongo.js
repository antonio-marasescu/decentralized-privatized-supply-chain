db.createUser({
    user: "tcmuser",
    pwd: "tcmpass",
    roles: [{role: "readWrite", db: "tcmdb"}],
    mechanisms: ["SCRAM-SHA-1"]
});

