-- A previous base creation bug did not set the accepted field to true for the automatically created admin member.
UPDATE base_members SET accepted = added WHERE acceptation_token IS NULL AND accepted IS NULL AND is_admin IS TRUE;
