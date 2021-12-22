import USID from 'usid';

export const usid = new USID();

export const removeFirstSlash = (str) => {
    let res = str.trim();
    
    if(res[0] === '/'){
        res = res.slice(1, res.length)
    }

    return res
}

export const postMockup = {
    id: "newId",
    title: "my title",
    isDeleted: false,
    data: {}
}

export const pathMockup =  {
    id: 'newId',
    path: '/new/path',
    postId: "postId",
    type:      "post",
    title:     "title",
    img:       "img",
    priority:  1,
    isHidden:  false
}

export const blockMockup = {
    id: "newId",
    type: "md",
    position: 1,
    data: ""
}