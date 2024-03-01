const mysqlExecute = require("../../util/mysqlConnexion");

class FreelancerDAO{
    static async createFreelancer(free ,cb){
        let sql = "INSERT INTO freelancer (idFreelancer, `name`, phoneNumber,cellphone,adress, email, `password`, idCity, `description`, url ) VALUES (?,?,?,?,?,?,?,?,?,?);" 
        const values = [free.idCard, free.name, free.telphone, free.cellphone, free.adress, free.email, free.password, parseFloat(free.idCity), free.description, free.profilePhoto];
        try{
            const results= await mysqlExecute(sql, values);
            cb({result: true});
        }catch(err){
            cb({result: false});
        }
       
    }

    static async fetchAll(p,cb){
        let sql= "select f.idFreelancer, f.name , t.name city, f.description, f.url from freelancer f left join town t using (idCity) where f.idCity=?";
        try{
            const results= await mysqlExecute(sql, [parseFloat(p.city)]);
            cb(results);
        }catch(err){
            cb({result: false});
        }
    }

    static async fetchByKeyword(p, cb){
        let sql = "SELECT * FROM freelancer WHERE description LIKE ? or name like ? and idCity=?";
        try {
            const results = await mysqlExecute(sql, [`%${p.keyword}%`, `%${p.keyword}%`, parseFloat(p.city)]);
            cb(results);
        } catch (err) {
            cb({ result: false });
        }

            }
}

module.exports = FreelancerDAO;