import * as sqreen from 'sqreen';
import * as express from 'express';
import * as sqlite3 from "sqlite3";

const db = new sqlite3.Database(':memory:');

const initDb = function (callback: Function): void {
    db.run('CREATE TABLE lorem (info TEXT);', (err) => {
        if (err) return callback(err);
        const insert = [];
        for (var i = 0; i < 10; i++) {
            insert.push(`('Ipsum_${i}')`);
        }
        db.run('INSERT INTO lorem (info) VALUES ' + insert.join(', '), (err) => {
            if (err) return callback(err);
            return callback();
        });
    });
};

const app = express();

app.use(sqreen.middleware);

app.get('/items/:id', (request, response, next) => {

    const id = request.params.id;
    db.all('SELECT ROWID, info FROM lorem WHERE ROWID=' + id, (err, rows) => {
        console.log(rows);
        if (err) return next(err);
        return response.json(rows);
    });
});

initDb((err)=> {
    if (err) throw err;
    app.listen(3000, () => {
        console.log('app listening on port 3000');
    });
});

