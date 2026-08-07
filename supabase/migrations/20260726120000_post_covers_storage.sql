
-- ============ STORAGE: blog post cover images ============
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-covers', 'post-covers', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can view post cover images"
  ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id = 'post-covers');

CREATE POLICY "Admins can upload post cover images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'post-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update post cover images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'post-covers' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'post-covers' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete post cover images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'post-covers' AND public.has_role(auth.uid(), 'admin'));
