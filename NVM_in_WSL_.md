## 1. Install WSL : 
CMD : 
```
sudo apt update
sudo apt install curl
```

## 2. Install NVM :
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
```

## 3. Activate NVM in the Current Shell Session
- After installing NVM, you need to load it into your shell session. You can do this by adding the following lines to your shell configuration file (~/.bashrc or ~/.zshrc depending on the shell you are using):


```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

```
- Then, source the file to load the changes:
```
source ~/.bashrc  # or source ~/.zshrc if you use zsh
```

## 4. Verfiy NVM
 ```
 nvm --version
 ```

## 5. Install Node
 ```
 nvm install 18
 ```

