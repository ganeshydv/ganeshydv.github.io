1. To remove all files from previous commits: 
   - `git rm -r --cached _path_`

2. To reset or to go previous commit :
   - `git reset .`

3. Delete branch
   - `git branch -d branchname`
   - `git branch -D branchname`

4. Rename branch 
   - `git branch -m old_branch_name new_branch_name`

5. Uncommit last commit
   - `git reset commit_hash`
     
6. Branch: Create + Checkout
   - `git branch -b branch_name`

7. Branch: 

# stash

6. Stash changes
   - `git stash`

7. List all stash
   - `git stash list`

8. Apply stash
   - `git stash apply stash@{0}`

9. Delete stash
   - `git stash drop stash@{0}`

10. Apply and delete stash
    - `git stash pop stash@{0}`

11. Clear all stash
    - `git stash clear`

12. Create branch from stash
    - `git stash branch branchname stash@{0}`
      
13. Create stash with Message
    - `git stash push -m 'message'`
---

Total : 145
- PORCELAIN : 82
- main: 44
- manipulators: 11
- interrogators : 17
- interactors: 10

---

- Plumbing -63
