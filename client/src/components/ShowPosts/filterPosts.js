import {EXP_MAPPINGS} from "./config.js";

export const filterPosts = (posts, filter) => {
    let sp = posts;
    let ignore = filter.ignore;
    console.log("Starting posts:")
    console.log(sp)
    console.log("Filter:")
    console.log(filter)
    console.log("Ignore:")
    console.log(ignore)

    // Sort fight 
    sp = sp.filter(post => {
        if (ignore.fight) {
            return true
        } else {
            return post.fight == filter.fight;
        }
    });

    // Sort ilvl
    sp = sp.filter(post => {
        if (ignore.ilvl) {
            return true
        } else {
            return post.ilvl <= filter.ilvl;
        }
    });

    // Sort roles
    sp = sp.filter((post) => {
        if (ignore.roles) {
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
        if (ignore.times) {
            return true
        } else {
            console.log("Times filter")
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
        };
    })

    // Sort prog
    sp = sp.filter(post => {
        if (ignore.prog) {
            return true
        } else {
            return post.prog == filter.prog;
        }
    });

    // Sort exp
    sp = sp.filter(post => {
        if (ignore.exp) {
            return true
        } else {
            return EXP_MAPPINGS[post.exp] <= EXP_MAPPINGS[filter.exp];
        }
    });

    return sp;
}