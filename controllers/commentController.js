const commentModel=require('../models/commentModel');
module.exports.view_comments = async (req, res) => {
    try {
        let search = '';
        if (req.query.search) {
            search = req.query.search;
        }
        let page = 0;
        let per_page = 2;
        if (req.query.page) {
            page = req.query.page;
        }
        let allRecord = await commentModel.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ]
        }).countDocuments();
        let totalPage = Math.ceil(allRecord / per_page);
        let commentRecord = await commentModel.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ]
        }).skip(page * per_page)
            .limit(per_page).populate('postId').exec();
        if (commentRecord) {
            return res.render('view_comments', {
                commentRecord: commentRecord,
                search: search,
                totalPage: totalPage,
                per_page: per_page,
                currentPage: page,
            });
        } else {
            req.flash('error', 'Error');
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
module.exports.deactive =async(req,res)=>{
    try{
        let commentDeactive=await commentModel.findByIdAndUpdate(req.params.id,{status:false});
        if(commentDeactive){
            req.flash('success','Record deactive successfully');
            return res.redirect('back')
        }else{
            req.flash('error','something wrong');
            return res.redirect('back')
        }

    }
    catch(err){
        console.log(err);
    }
}
module.exports.active=async(req,res)=>{
    try{
        let changeStatus=await commentModel.findByIdAndUpdate(req.params.id,{status:true});
        if(changeStatus){
            req.flash('success','Record successfully activated !');
            return res.redirect('back');
        }
        else{
            req.flash('error','error');
            return res.redirect('back');
        }
    }
    catch(err){
        console.log(err);
        return res.redirect('back');
    }
}