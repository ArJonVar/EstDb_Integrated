WORKED:::!!!::!!:

1. curl https://api.smartsheet.com/2.0/token
-d 'grant_type=authorization_code&code={code}&client_id=o50ix7yzq7uh61cdqld&client_secret=9kwypxclzyfl9zi0yck'
-X POST
2. curl https://api.smartsheet.com/2.0/users/me
-H "Authorization: Bearer nq7c2afs1r7rxsu4jqkm438owx"

