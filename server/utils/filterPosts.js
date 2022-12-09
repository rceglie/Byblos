const EXP_MAPPINGS = {
    "First Ultimate Experience": 0,
    "Some Past Ultimate Prog": 1,
    "One Ultimate Clear": 2,
    "Double Legend": 3,
    "Triple Legend": 4
}

export const filterPosts = (posts, filter) => {
    
    let sp = posts;

    // Sort fight 
    sp = sp.filter(post => {
        if (filter.fight == "ANY") {
            return true
        } else {
            return post.fight == filter.fight;
        }
    });

    // Sort ilvl
    sp = sp.filter(post => {
        if (filter.ilvl == "ANY") {
            return true
        } else {
            return post.ilvl <= filter.ilvl;
        }
    });

    // Sort roles
    sp = sp.filter((post) => {
        if (filter.roles.length == 0) {
            return true
        } else {
            let val = false;
            for (let role in filter.roles){
                for (let slot in post.roles){
                    val = slot.includes(role) || val;
                }
            }
            return val;
        };
    })

    for (let i = 0; i < filter.times.length; i++){
        let date = new Date(filter.times[i])
        date.setHours(date.getHours()-5);
        filter.times[i] = date.toISOString();
    }
    console.log("all times",filter.times)

    // Sort times
    sp = sp.filter((post) => {
        if (filter.times.length == 0){
            return true
        }
        // make sure every time in post.time is in filter.time
        for (let i = 0; i < post.times.length; i++){
            let date = new Date(post.times[i])
            //date.setHours(date.getHours()-5);
            date = date.toISOString();
            if (!filter.times.includes(date)){
                console.log("filter" , filter.times, "does not include", date)
                return false;
            }
        }
        return true;
    })

    // Sort prog
    sp = sp.filter(post => {
        if (filter.prog == "ANY") {
            return true
        } else {
            return post.prog == filter.prog;
        }
    });

    // Sort exp
    sp = sp.filter(post => {
        if (filter.exp == "ANY") {
            return true
        } else {
            return EXP_MAPPINGS[post.exp] <= EXP_MAPPINGS[filter.exp];
        }
    });

    return sp;
}