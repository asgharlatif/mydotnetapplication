
/*
 * GET home page.
 */

exports.RegisteredStudent = function(req, res){
    res.render('index', { title: 'Express Student' });
};

exports.StudentLoginForm=function(req,res){

    res.render('index',{title:'Student Login Services'});

};