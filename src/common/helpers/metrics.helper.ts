export function calculateCourseReview(
  ratings: number[], // promedio de cada lección
  quantityReviews: number[], // cantidad de reviews de cada lección
): number {
  if (!ratings.length || !quantityReviews.length) return 0;

  const totalReviews = quantityReviews.reduce((a, b) => a + b, 0);
  if (totalReviews === 0) return 0;

  const weightedSum = ratings.reduce(
    (sum, rating, idx) => sum + rating * quantityReviews[idx],
    0,
  );

  return weightedSum / totalReviews;
}

export function calculateLessonReview(ratings: number[]): number {
  if (!ratings.length) return 0;

  const sum = ratings.reduce((acc, r) => acc + r, 0);
  return sum / ratings.length;
}
