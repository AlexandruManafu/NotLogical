class Utils{

    isSubstring(small,large)
    {
        return large.indexOf(small) > -1;
    }
}

const utils = new Utils()
module.exports = utils