import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const createPost = async (req, res) => {
    
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString()});

    try{
        await newPost.save();
        res.status(201).json(newPost)
    } catch (error){
        res.status(409).json({ message : error.message })
    }
}

export const createData = async (req, res) => {
   
    await PostMessage.deleteMany({});

    for (let j = 0; j < 5; j++){

        let data = {};

        data.creator = "637a5d9779f40e711928ac4d"
        data.fight = ["UWU","DSU","TEA","UCOB"][Math.floor(Math.random() * 4)];

        const startDate = new Date("2022-11-20");
        const oneHourInMilliseconds = 60 * 60 * 1000; // 1 hour in milliseconds
        const oneWeekInHours = 7 * 24; // 1 week in hours
        const randomNumberOfSegments = 2 + Math.floor(Math.random() * 6);
        const hourIncrements = [];

        for (let segment = 0; segment < randomNumberOfSegments; segment++) {
            const randomNumberOfHours = 3 + Math.floor(Math.random() * 14); // 3 to 15 hour segments
            const randomStartPoint = Math.floor(Math.random() * (oneWeekInHours - randomNumberOfHours)); // Random start point

            // We can use these values to create a list of one-hour increments within the segment
            const segmentHourIncrements = [];
            for (let i = 0; i < randomNumberOfHours; i++) {
                // Calculate the starting time for each increment
                const incrementStartTime = new Date(startDate.getTime() + ((randomStartPoint + i) * oneHourInMilliseconds));

                // Add the starting time as an ISO string to the list of hour increments for the segment
                segmentHourIncrements.push(incrementStartTime.toISOString());
            }

            // Add the list of hour increments for the segment to the overall list of hour increments
            hourIncrements.push(segmentHourIncrements);
        }

        data.times = [...new Set([].concat(...hourIncrements))];

        data.prog = ["Fresh", "ANY"][Math.floor(Math.random() * 2)];

        let rsize = Math.floor(Math.random() * 6) + 1;
        console.log(rsize)
        data.roles = new Array(rsize)
        let allRoles = ["war","pld","gnb","whm","sge", "sch", "sam", "nin", "blm", "mch"]
        for (let i = 0; i<rsize; i++){
            let num = Math.floor(Math.random() * (10 + 1) - 1);
            while (data.roles[i] == undefined || data.roles[i].length < num){
                let role = allRoles[Math.floor(Math.random() * allRoles.length)]
                if (data.roles[i] == undefined){
                    data.roles[i] = [role];
                } else if (!data.roles[i].includes(role)){
                    data.roles[i].push(role);
                }
            }
        }

        data.ilvl = Math.floor(Math.random() * (630 - 0) + 0);
        data.exp = ["First Ultimate","Some Ultimate Experience","Triple Legend","ANY"][Math.floor(Math.random() * 4)];
        data.sum = "Group summary"
        data.desc = "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."

        try{
            const newPost = new PostMessage({...data, createdAt: new Date().toISOString()});
            await newPost.save();
        } catch (error){
            console.log(error)
        }
    }
    res.status(201).json({message: "success"})
}