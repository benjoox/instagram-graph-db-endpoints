MATCH (user: User)-[:LIKED]->(photo:Photo {id:$photoID})
RETURN user