UPDATE resources
SET
	slug = replace(slug, '+', 'plus-0'),
	title_duplication_check_slug = replace(title_duplication_check_slug, '+', 'plus-0');
