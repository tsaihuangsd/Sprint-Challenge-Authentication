<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
- To create an encrypted file called cookie that persists the client's authentication 

2. What does bcrypt do to help us store passwords in a secure manner.
- bcrypt is a pre-writen hashing function that converts a password into an encrypted hash value

3. What does bcrypt do to slow down attackers?
- it has a cryptographic algorithm to encrypt password into hash
- it uses a 'salt' value to determines the number of times the cryptographic algorithm applies to the hash

4. What are the three parts of the JSON Web Token?
- payload (may include user information)
- secret key
- options(may include token validity timeframe)
