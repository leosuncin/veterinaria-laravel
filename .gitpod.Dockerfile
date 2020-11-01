FROM gitpod/workspace-mysql:latest

USER root

RUN pip install httpie

USER gitpod
