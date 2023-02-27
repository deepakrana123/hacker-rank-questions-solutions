module.exports={
    answers:[
        `int simpleArraySum(vector<int> ar)
        {
            int iSum = 0;
            
            for(int i = 0; i < ar.size(); i++)
                iSum += ar[i];
            return iSum;
        }`,
        `vector<int> compareTriplets(vector<int> a, vector<int> b) 
        {
            vector<int> alice;
            vector<int> bob;
            vector<int> pointscount;
            
            for(int i = 0; i < a.size(); i++)
            {
                if(a[i] > b[i])
                {
                    alice.push_back(1);
                }
                else if(a[i] < b[i])
                {
                    bob.push_back(1);
                }
            }
            
            pointscount.push_back(alice.size());
            pointscount.push_back(bob.size());
            
            return pointscount;
        }`
    ]
}