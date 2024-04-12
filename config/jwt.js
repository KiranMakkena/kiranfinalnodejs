const jwt = require('jsonwebtoken');

const token = jwt.sign({ userId: "endhukudhoola" }, 'your-secret-key', {
  expiresIn: '1h',
});

const decoded = jwt.verify(token, 'your-secret-key');
const userId = decoded.userId;

console.log(token);
console.log(userId);