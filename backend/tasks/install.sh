#!env /bin/bash

# Compila (limpa e constrói)
mvn clean package -Pwildfly-swarm

# Executa
java -jar -Xmx128m target/todo-swarm.jar