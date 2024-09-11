# 베이스 이미지로 Python 3.8 사용
FROM python:3-slim

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일을 컨테이너로 복사
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 파일 복사
COPY . .

# # 환경 변수 설정
# ENV FLASK_APP=app.py
# ENV FLASK_RUN_HOST=0.0.0.0

# Flask 애플리케이션 실행 명령어
CMD ["flask", "run", "--host=0.0.0.0"]
