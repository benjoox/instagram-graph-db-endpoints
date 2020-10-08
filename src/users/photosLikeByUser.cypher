MATCH (user: User { username: $username })-[:LIKED]->(photo:Photo)
RETURN user, photo
      