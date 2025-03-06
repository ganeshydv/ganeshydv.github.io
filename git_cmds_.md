# Branch
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
----
# Stash : to store files 

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
# Commit 
14. Amend Commit Message
    - `git commit --amend -m "New commit message"`
# Remove commit:

15. Remove last commit without deleting changed code
    - `git reset --soft HEAD~1`
- ## Remove all files :
    - `git rm -rf .`

# Reset - Unsatge files
16. Soft Reset: `git reset --soft HEAD~1` (keeps changes staged)
   - Mixed Reset: `git reset --mixed HEAD~1` (keeps changes in working directory, unstages them)
   - Hard Reset: `git reset --hard HEAD~1` (removes/[**deletes**] changes completely)
   - to unstage files: `git reset` || `git reset HEAD .` || `git restore --staged .` 
---

# Search and Apply Specific Commits - cherry-pick

17. identify commit with Hash
  - `git log --oneline`

18. Cherry-pick the Commit
  - `git cherry-pick <commit-hash_1> <commit-hash_2>`

19. to Apply RANGE of commits from Branch 
  - `git checrry-pick start_commit_hash^..end_commit_hash` 

20. if conflicts : resolve them and then use cmd :
  -  `git cherry-pick --continue`

21. to stop and abort /undo
  - `git cherry-pick --abort`
----
# Git Reabse : to combine commits
22.
  - 1. Rebase Interactively:

       - Use the git rebase command with the -i (interactive) option to squash commits.
Specify the base commit before the first commit you want to squash. If you want to squash all commits on the current branch, you can use HEAD~N where N is the number of commits you want to squash
        - cmd :`git rebase -i HEAD~N`
  - 2. Mark Commits for Squashing:

        - An editor will open with a list of commits. The first commit will be marked as pick by default.
Change pick to squash (or s) for all commits except the first one. This will squash those commits into the first commit.
Example:
pick 1234567 First commit message
             ```text
             squash 2345678 Second commit message
             squash 3456789 Third commit message
             ```

   - 3. Edit Commit Message:
   - 4. `git rebase --continue`
   - 5. `git rebase --abort`
   - 6. `git add <file-with-conflict>`
   - `git rebase --continue`
- ## Merge all commits in your branch into one new commit using a squash merge
   - `git merge --squash feature-branch`
   - then commit.

# Git LOGS History
23.  git Reflog: 
    - cmd : `git reflog`
# GIt Clean
24. clean file unstaged files:
    `git clean -f`
25. check beafore clean which files+dir removed:
   `git clean -fdn`
26. remove untracked files : .gitignore
   `git clean -fdx`

# Orphan Branch: clean 
   - `git checkout --orphan clean-branch`

# Remove all files :
   - `git rm -rf .`

# Configure Remote Repo :
  - Set Remote URL :
    ```
    git remote add origin https://github.com/username/repo.git
    ```
   - Check Repo :
     ```
       git remote -v
     ```
   - Change Remote URL:

     ```
     git remote set-url origin https://new-url.git
     ```
   - Enable/Disable Colored Output:
     ```
     git config color.ui auto
     ```
   - Set Merge Tool:
      ```
      git config merge.tool vimdiff
      ```
   - Set User Name:
      ```
      git config user.name "Your Name"
      ```
   - Set User Email:
     ```
     git config user.email "your.email@example.com"
     ```
   - Set Default Branch Name (e.g., main)
     ```
     git config init.defaultBranch main
     ```
   - Enable Rebase for Pulls:
     ```
     git config pull.rebase true
     ```
   - View Config
      ```
      git config --list
      git config -l
      ```
   - Repository-specific config file (in .git/config):
     ```
     nano .git/config
     ```
   - Global config file (in ~/.gitconfig)
      ```
      nano ~/.gitconfig
      ```
# save Configuration for Automation
If you want to share configurations (like hooks or templates), use .git/config directly in the repository, or consider adding automation scripts for CI/CD.

#
## Total : 145
- PORCELAIN : 82
- main: 44
- manipulators: 11
- interrogators : 17
- interactors: 10
- Plumbing -63
