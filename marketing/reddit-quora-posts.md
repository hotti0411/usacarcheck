# usacarcheck.com — Reddit / Quora 게시물 세트 (Option B)

> 목표: "홍보 티 안 나게 도움 주는" 글로 초기 유입 + 백링크 + 구글 색인 가속.
> 운영 원칙: **하루 1~2개만**, 서로 다른 계정/날짜로 분산, 항상 "내가 만든 무료 툴"이라고 솔직하게.

---

## ⚠️ 시작 전 필독 (밴 방지)

1. **계정 준비**: Reddit 신규 계정은 링크가 자동삭제됩니다. 먼저 3~5일간 관련 서브에서 **그냥 댓글/답변만** 달아 카르마 20~50 쌓고 시작.
2. **9:1 룰**: 홍보성 글 1개당, 순수하게 도움 되는 댓글 9개. 이 비율 깨면 스팸으로 신고당함.
3. **링크 위치**: 본문 첫 줄에 링크 X. 도움되는 내용 먼저 → 맨 끝에 "I made a free checker for this: [링크]" 식.
4. **솔직하게**: "I built this" 라고 밝히기. 제3자인 척 = 최악의 밴 사유.
5. **속도**: 절대 같은 날 여러 서브에 똑같은 글 X. 하루 1곳, 매번 문구 조금씩 다르게.
6. **각 서브 규칙 확인**: 사이드바에 "no self-promotion" 명시된 곳은 본문 링크 금지 → 댓글 답변형으로만.

---

## A. 댓글 답변형 (가장 안전 · 추천) — 기존 질문에 달기

Reddit/Quora 검색창에 아래 키워드로 검색 → 관련 질문 글에 답변으로 달기:
`car loan interest deduction`, `one big beautiful bill car`, `auto loan interest tax 2025`, `is my car eligible deduction`, `final assembly USA car deduction`

### 답변 템플릿 1 — 정보형 (r/tax, r/personalfinance, Quora)
```
The 2025 law (the "One Big Beautiful Bill") lets you deduct up to $10,000/year of
interest on a NEW car loan for tax years 2025–2028. The catches most people miss:

- The car must have FINAL ASSEMBLY in the U.S. — and that's VIN-specific, not just
  "an American brand." A Ford can be assembled in Mexico; a Honda can be assembled in
  Ohio. The brand tells you nothing; the VIN does.
- New vehicle only, you must be the first owner, personal use, loan originated after
  Dec 31, 2024.
- It phases out above $100k MAGI ($200k joint).

If you want to check your exact vehicle, decode the VIN at the NHTSA vPIC database
(free, official) and look at the "Plant Country" field. I got tired of doing that
manually so I built a free tool that does it for you: usacarcheck.com — paste the VIN
and it tells you if the final-assembly requirement is met. No signup, no data stored.
```

### 답변 템플릿 2 — 짧은 도움형 (차 서브: r/askcarsales, r/cars, r/whatcarshouldIbuy)
```
Heads up if you're financing in 2025–2028: you may be able to deduct up to $10k/yr of
the loan interest, BUT only if the car's final assembly was in the U.S. — and that's
decided by the VIN, not the badge. Worth checking before you sign. I built a free VIN
checker for exactly this: usacarcheck.com
```

### 답변 템플릿 3 — 세무 전문가 톤 (r/Accounting, r/tax 의 디테일 질문)
```
Worth flagging the final-assembly nuance since it trips people up: eligibility keys off
the vehicle's place of final assembly (NHTSA "Plant Country" on the VIN decode), not the
manufacturer's nationality. Same model, same year can qualify or not depending on the
plant. I keep a free VIN-level lookup at usacarcheck.com that pulls the NHTSA data so I
don't have to eyeball the vPIC output each time.
```

---

## B. 본문 게시형 (서브 규칙이 self-promo 허용할 때만)

### 글 1 — r/tax 또는 r/personalfinance ("PSA" 형식)
**Title:** PSA: the new car-loan-interest deduction (2025–2028) depends on your VIN, not the car's brand

**Body:**
```
A lot of the coverage on the new $10k/yr car loan interest deduction skips the part that
actually determines whether YOU qualify, so here's the short version:

WHAT: Deduct up to $10,000/year of interest on a new car loan, tax years 2025–2028.

THE CATCH everyone gets wrong: the car must have had its FINAL ASSEMBLY in the United
States. People assume "American brand = qualifies." Not true. Final assembly is plant-
specific and shows up on the VIN. Examples:
- Some Toyota/Honda/BMW models are assembled in the U.S. → can qualify.
- Some Ford/Chevy/Jeep models are assembled in Mexico/Canada → don't qualify.

OTHER REQUIREMENTS: new vehicle, first owner, personal use, loan after Dec 31 2024,
phases out above $100k MAGI ($200k joint).

HOW TO CHECK: decode your VIN on NHTSA's free vPIC site and look at "Plant Country."
I built a free tool that does this in one step (paste VIN → yes/no): usacarcheck.com.
Mods, happy to remove the link if it's not allowed — the info above stands on its own.
```

### 글 2 — r/whatcarshouldIbuy / 차 구매 서브 (구매 결정 각도)
**Title:** If you're buying new in 2025, the loan-interest deduction can swing which trim/model makes sense — but it's VIN-dependent

**Body:**
```
Quick thing I wish more buyers knew: the new car-loan-interest deduction (up to $10k/yr,
2025–2028) only applies if the specific vehicle's final assembly was in the U.S. Two cars
that look identical on the lot can differ because they came off different plants.

So before you commit, it's worth checking the build. The data is on the VIN (NHTSA's
"Plant Country"). I made a free checker so you don't have to dig through the raw decoder:
usacarcheck.com — paste the VIN, get a yes/no plus the requirements. Built it because no
neutral tool existed (just dealer pages).
```

---

## C. Quora 전용

Quora는 self-promo에 Reddit보다 관대하지만, **답변 품질**이 노출을 결정.
관련 질문 검색: "car loan interest deduction 2025", "is auto loan interest tax deductible", "one big beautiful bill car deduction".

→ **답변 템플릿 1**을 그대로 쓰되, 마지막 줄에 링크. Quora는 질문당 한 번만, 진짜 답이 되는 질문에만.

타겟 Quora 질문 유형:
- "Is car loan interest tax deductible in 2025?"
- "Which cars qualify for the new auto loan interest deduction?"
- "How does the One Big Beautiful Bill affect car buyers?"

---

## D. 게시 스케줄 (2주, 하루 1개)

| Day | 채널 | 형식 |
|---|---|---|
| 1~4 | (워밍업) r/tax, r/personalfinance 에서 **링크 없이** 일반 댓글만 | 카르마 쌓기 |
| 5 | r/tax | 댓글 템플릿 1 (관련 질문에) |
| 6 | Quora 질문 1개 | 템플릿 1 |
| 7 | r/personalfinance | 댓글 템플릿 1 |
| 8 | r/askcarsales | 댓글 템플릿 2 |
| 9 | (휴식 / 댓글만) | — |
| 10 | r/whatcarshouldIbuy | 본문 글 2 |
| 11 | Quora 질문 2개 | 템플릿 1 |
| 12 | r/cars | 댓글 템플릿 2 |
| 13 | r/Accounting | 댓글 템플릿 3 |
| 14 | r/personalfinance | 본문 글 1 (PSA) |

> 반응(업보트/댓글) 좋은 채널을 찾으면 거기 집중. 삭제당하면 그 서브는 self-promo 금지니 댓글형으로만.

---

## E. 측정

- 게시물마다 끝에 UTM은 **붙이지 마세요** (Reddit이 추적링크 싫어함). 대신 Cloudflare/Search Console에서 referrer로 Reddit/Quora 유입 확인.
- 어떤 글이 업보트 받는지 = 어떤 각도가 먹히는지 신호. 그 각도로 SEO 페이지 카피도 보강.
