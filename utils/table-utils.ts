const getOptions =(_files)=>{
    let options = _files.map(_file=>({value:_file,answerType:"file",target:null}));
    return options;
}

export {getOptions};