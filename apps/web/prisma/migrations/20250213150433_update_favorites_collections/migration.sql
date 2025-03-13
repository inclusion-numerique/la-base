UPDATE collections 
SET title = 'Mes favoris',
    is_public = false, 
    description = 'Retrouvez vos ressources favorites !',  
    image_id = null, 
    deleted = null
WHERE is_favorites IS true;