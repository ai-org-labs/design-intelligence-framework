# Human decision record / 人間の判断の記録

Record only a decision actually supplied by a human. The following is a **synthetic format example**, not an approval of the sample design. Replace actor, source, time, target and rationale with the real statement. Do not invent consent.

```json
{
  "approval": {
    "id": "approval-from-human-001",
    "scope": "design-adoption",
    "targetIds": ["candidate-a"],
    "status": "approved",
    "actor": "Actual human decision-maker",
    "source": "Actual message or decision document reference",
    "recordedAt": "2026-10-10T13:00:00Z",
    "authority": "human-attested"
  },
  "decision": {
    "id": "decision-001",
    "candidateIds": ["candidate-a"],
    "action": "adopt",
    "rationale": "Actual reason supplied by the human",
    "approvalId": "approval-from-human-001",
    "resultCandidateId": null
  }
}
```

Save as a separate record file, then run:

```sh
node bin/dif.mjs decide examples/login/design.json actual-record.json examples/login/decided.json
```

Output must be in the same folder so relative artifact paths retain meaning. Existing files are never overwritten. The earlier proposal may still say “pending”, so the command marks proposal artifacts missing. Regenerate the proposal with the human decision, update its digest/status, then validate the new package. A recorded adoption does not promote the product to Stable.

本人の認証や電子署名は実装していません。`human-attested`は入力者の記録上の表明です。単なるactor文字列を本人確認の証拠として扱わないでください。
