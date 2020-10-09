MATCH (user: User { username: $username})
DETACH DELETE user