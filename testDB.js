const pool = require('./db'); // Adjust the path if needed

(async () => {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Database connected successfully:', result.rows[0]);
    } catch (err) {
        console.error('Error connecting to the database:', err);
    } finally {
        pool.end();
    }
})();
