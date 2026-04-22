from rest_framework import generics
from .models import Post
from .serializers import PostSerializer

class PostListView(generics.ListAPIView):
    queryset = Post.objects.filter(is_published=True)
    serializer_class = PostSerializer

class PostDetailView(generics.RetrieveAPIView):
    queryset = Post.objects.filter(is_published=True)
    serializer_class = PostSerializer
    lookup_field = 'slug'
