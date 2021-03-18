# Keepit test task

## Tech Stack

Node.js, Typescript. That's it.

## Task Description 

```
In order to limit the options presented in a user interface, we wish to be able to determine if the given access rights granted to the current user include or does not include a given specific access.

Accesses are represented in "Access Control Lists"; these are colon-separated lists of access control entries. Each access control entry consists first of a list of operations ("G" for GET, "U" for PUT, "P" for POST, "D" for DELETE, "H" for HEAD, "O" for OPTIONS) then a slash and finally the name of the endpoint controlled.

For example, a user with "GET" access to the "Time" endpoint and "GET", "DELETE" and "POST" access to the "Users" endpoint would have an effective ACL that looks like: "G/Time:GDP/Users"

The ordering of operations and the order of endpoint names is not significant.

In our application we wish to have a simple and efficient function to determine of a single ACL entry is "dominated" by the users effective ACL. One ACL dominates another, if it contains at least the same access rights.

In other words:

"G/Time" is dominated by "G/Time:GDP/Users"
"D/Users" is dominated by "G/Time:GDP/Users"
"PD/Users" is dominated by "G/Time:GDP/Users"

but

"P/Time" is NOT dominated by "G/Time:GDP/Users"
"H/Users" is NOT dominated by "G/Time:GDP/Users"

Please provide the implementation for the following function:

function acl_concrete_dominated(concrete, effective)

Where 'concrete' is a single ACL entry like 'GH/Time' and 'effective' is a list of ACL entries like 'GPU/Users:G/Time'.

The function is expected to return true in the affirmative case, false in the negative and to throw on error.
```

## Implementation

There are three implementations provided. Ok, two. But maybe someday there will be three 
 
 - **Stupid simple**
    
    Just a most simple solution. The first one that comes into mind. 

 - **Using ascii**

    *I must admit this is not the best way. And maybe the worst even. There are quite high chances of collision and false-positive results*

    Each character can be represented as an ASCII number. So we can calculate the sum. Let's call it `weight`. We are generating one set of all possible ACL weights by effective ACL entry. The same thing we are doing for the concrete ACL. And looking if we have weight entry in the effective set. 

 - **Bitwise** 
  
    This is maybe someday. But to add intrigue, let's present our ALC operations `GUPDHO` as a sequence `111111` for full access. Then concrete ACL will be lool lile `001001` for `PO`. Therefore... 

