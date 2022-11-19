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

    // Sort times
    sp = sp.filter((post) => {
        return true;
        let val = true;
        ["sun", "mon", "tues", "wed", "thur", "fri", "sat"].forEach((day) => {
            if (filter.times[day + 'e'] == -1 && post.times[day + 'e'] != -1){
                val = false
            }
            if ((filter.times[day + 'e'] < post.times[day + 'e']) || (filter.times[day + 's'] > post.times[day + 's'])){
                val = false
            }
        });
        return val;
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